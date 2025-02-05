package com.neuroCanteen.security;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.neuroCanteen.filters.JwtRequestFilter;
import com.neuroCanteen.service.*;

import java.util.Arrays;

@Configuration
public class SecurityConfigurer {
    private final StaffDetailsService staffDetailService;
    private final MyUserDetailsService myUserDetailsService;
    private final DietitianDetailsService myDietitianDetailsService;
    private final DeliveryUserDetailsService deliveryUserDetailsService;
    private final PatientDetailsService patientDetailsService;
    private final KitchenUserDetailsService kitchenUserDetailsService;
    private final JwtRequestFilter jwtRequestFilter;

    public SecurityConfigurer(
        KitchenUserDetailsService kitchenUserDetailsService, 
        PatientDetailsService patientDetailsService, 
        DeliveryUserDetailsService deliveryUserDetailsService, 
        DietitianDetailsService myDietitianDetailsService, 
        MyUserDetailsService myUserDetailsService, 
        StaffDetailsService staffDetailService, 
        JwtRequestFilter jwtRequestFilter) {
        
        this.myUserDetailsService = myUserDetailsService;
        this.staffDetailService = staffDetailService;
        this.myDietitianDetailsService = myDietitianDetailsService;
        this.deliveryUserDetailsService = deliveryUserDetailsService;
        this.patientDetailsService = patientDetailsService;
        this.kitchenUserDetailsService = kitchenUserDetailsService;
        this.jwtRequestFilter = jwtRequestFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())  // Disable CSRF for APIs and WebSockets
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/authenticate/**").permitAll()
                .requestMatchers("/order-updates/**").permitAll() // Allow WebSocket connections
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/**").permitAll()
                .requestMatchers(HttpMethod.PUT, "/**").permitAll()
                .requestMatchers(HttpMethod.PATCH, "/**").permitAll()
                .anyRequest().authenticated()
            )
            .exceptionHandling(ex -> ex
                .authenticationEntryPoint((request, response, authException) -> 
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized Access"))
            )
            .sessionManagement(session -> session.disable()) // Disable session management (use JWT)
            .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);  

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(PasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider adminAuthProvider = new DaoAuthenticationProvider();
        adminAuthProvider.setUserDetailsService(myUserDetailsService);
        adminAuthProvider.setPasswordEncoder(passwordEncoder);

        DaoAuthenticationProvider staffAuthProvider = new DaoAuthenticationProvider();
        staffAuthProvider.setUserDetailsService(staffDetailService);
        staffAuthProvider.setPasswordEncoder(passwordEncoder);

        DaoAuthenticationProvider dietitianAuthProvider = new DaoAuthenticationProvider();
        dietitianAuthProvider.setUserDetailsService(myDietitianDetailsService);
        dietitianAuthProvider.setPasswordEncoder(passwordEncoder);

        DaoAuthenticationProvider deliveryAuthProvider = new DaoAuthenticationProvider();
        deliveryAuthProvider.setUserDetailsService(deliveryUserDetailsService);
        deliveryAuthProvider.setPasswordEncoder(passwordEncoder);

        DaoAuthenticationProvider patientAuthProvider = new DaoAuthenticationProvider();
        patientAuthProvider.setUserDetailsService(patientDetailsService);
        patientAuthProvider.setPasswordEncoder(passwordEncoder);

        DaoAuthenticationProvider kitchenAuthProvider = new DaoAuthenticationProvider();
        kitchenAuthProvider.setUserDetailsService(kitchenUserDetailsService);
        kitchenAuthProvider.setPasswordEncoder(passwordEncoder);

        return new ProviderManager(Arrays.asList(
            adminAuthProvider, staffAuthProvider, dietitianAuthProvider, 
            deliveryAuthProvider, patientAuthProvider, kitchenAuthProvider
        ));
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance();
    }
}
