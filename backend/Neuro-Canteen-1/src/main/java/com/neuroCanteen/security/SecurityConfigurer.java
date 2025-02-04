package com.neuroCanteen.security;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.neuroCanteen.filters.JwtRequestFilter;
import com.neuroCanteen.service.*;

import java.util.List;

@Configuration
public class SecurityConfigurer {

    private final StaffDetailsService staffDetailService;
    private final MyUserDetailsService myUserDetailsService;
    private final DietitianDetailsService myDietitianDetailsService;
    private final DeliveryUserDetailsService deliveryUserDetailsService;
    private final KitchenUserDetailsService kitchenUserDetailsService;
    private final PatientDetailsService patientDetailsService;
    private final JwtRequestFilter jwtRequestFilter;

    public SecurityConfigurer(
            DeliveryUserDetailsService deliveryUserDetailsService,
            DietitianDetailsService myDietitianDetailsService,
            MyUserDetailsService myUserDetailsService,
            StaffDetailsService staffDetailService,
            KitchenUserDetailsService kitchenUserDetailsService,
            PatientDetailsService patientDetailsService,
            JwtRequestFilter jwtRequestFilter) {
        this.myUserDetailsService = myUserDetailsService;
        this.staffDetailService = staffDetailService;
        this.myDietitianDetailsService = myDietitianDetailsService;
        this.deliveryUserDetailsService = deliveryUserDetailsService;
        this.kitchenUserDetailsService = kitchenUserDetailsService;
        this.patientDetailsService = patientDetailsService;
        this.jwtRequestFilter = jwtRequestFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())  // Disable CSRF for APIs
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/authenticate/*").permitAll()
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/**").permitAll()
                .anyRequest().authenticated()
            )
            .exceptionHandling(ex -> ex
                .authenticationEntryPoint((request, response, authException) -> 
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized Access"))
            )
            .sessionManagement(session -> session.disable()) // No session management
            .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);  // Add JWT filter

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(PasswordEncoder passwordEncoder) {
        return new ProviderManager(List.of(
            createAuthProvider(myUserDetailsService, passwordEncoder),  // Admin
            createAuthProvider(staffDetailService, passwordEncoder),   // Staff
            createAuthProvider(myDietitianDetailsService, passwordEncoder), // Dietitian
            createAuthProvider(deliveryUserDetailsService, passwordEncoder), // Delivery
            createAuthProvider(kitchenUserDetailsService, passwordEncoder), // Kitchen User
            createAuthProvider(patientDetailsService, passwordEncoder) // Patient Authentication
        ));
    }

    private DaoAuthenticationProvider createAuthProvider(UserDetailsService userDetailsService, PasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder);
        return provider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
         return NoOpPasswordEncoder.getInstance();
    }
}
