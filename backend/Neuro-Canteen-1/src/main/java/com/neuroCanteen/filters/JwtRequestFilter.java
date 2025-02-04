package com.neuroCanteen.filters;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.neuroCanteen.security.util.JwtUtil;
import com.neuroCanteen.service.DeliverUserService;
import com.neuroCanteen.service.DeliveryUserDetailsService;
import com.neuroCanteen.service.DietitianDetailsService;
import com.neuroCanteen.service.KitchenUserDetailsService;
import com.neuroCanteen.service.MyUserDetailsService;
import com.neuroCanteen.service.PatientDetailsService;
import com.neuroCanteen.service.StaffDetailsService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.core.context.SecurityContextHolder;

import java.io.IOException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private MyUserDetailsService userDetailsService;

    @Autowired
    private StaffDetailsService staffDetailsService;

    @Autowired
    private PatientDetailsService patientDetailsService;

    @Autowired
    private DietitianDetailsService dietitianDetailsService;

    @Autowired
    private DeliveryUserDetailsService deliveryUserDetailsService;

    @Autowired
    private KitchenUserDetailsService kitchenUserDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        // Corrected the typo 'authorization Header' to 'authorizationHeader'
        final String authorizationHeader = request.getHeader("Authorization");

        String username = null;
        String jwt = null;
        String role = null;

        // Check if the request contains the "Authorization" header with "Bearer " prefix
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);  // Extract the JWT token from the header
            username = jwtUtil.extractUsername(jwt);  // Extract the username from the JWT
            role =  jwtUtil.extractRole(jwt);
        }

        // If the username is not null and no authentication exists in the security context
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails = null; // Declare outside to use later

            switch (role) {
                case "Admin":
                    userDetails = userDetailsService.loadUserByUsername(username);
                    break;
                case "Staff":
                    userDetails = staffDetailsService.loadUserByUsername(username);
                    break;
                case "Patient":
                    userDetails = patientDetailsService.loadUserByUsername(username);
                    break;
                case "Dietitian":
                    userDetails = dietitianDetailsService.loadUserByUsername(username);
                    break;
                case "Delivery":
                    userDetails = deliveryUserDetailsService.loadUserByUsername(username);
                    break;
                case "Kitchen":
                    userDetails = kitchenUserDetailsService.loadUserByUsername(username);
                    break;

                default:
                    throw new IllegalArgumentException("Invalid role: " + role); // Handle unexpected roles
            }
            

            // Validate the JWT token
            if (jwtUtil.validateToken(jwt, username)) {  // Pass the username, not UserDetails
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = 
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
        }

        // Continue the filter chain
        chain.doFilter(request, response);
    }
}
