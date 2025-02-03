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
import com.neuroCanteen.service.MyUserDetailsService;
import com.neuroCanteen.service.StaffDetailsService;

import java.util.Arrays;

@Configuration
public class SecurityConfigurer {
    private final StaffDetailsService staffDetailService;
    private final MyUserDetailsService myUserDetailsService;
    private final JwtRequestFilter jwtRequestFilter;
    public SecurityConfigurer(MyUserDetailsService myUserDetailsService,StaffDetailsService staffDetailService,JwtRequestFilter jwtRequestFilter) {
        this.myUserDetailsService = myUserDetailsService;
        this.staffDetailService = staffDetailService;
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
            .sessionManagement(session -> session.disable())
            .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);  // Add the JwtRequestFilter before UsernamePasswordAuthenticationFilter // No session management

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(PasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider adminAuthProvider = new DaoAuthenticationProvider();
    adminAuthProvider.setUserDetailsService(myUserDetailsService); // Admin service
    adminAuthProvider.setPasswordEncoder(passwordEncoder);

    DaoAuthenticationProvider staffAuthProvider = new DaoAuthenticationProvider();
    staffAuthProvider.setUserDetailsService(staffDetailService); // Staff service
    staffAuthProvider.setPasswordEncoder(passwordEncoder);

    return new ProviderManager(Arrays.asList(adminAuthProvider, staffAuthProvider));
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
         return NoOpPasswordEncoder.getInstance();
    }
}
