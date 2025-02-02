package com.neuroCanteen.controller.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.neuroCanteen.model.authentication.AuthenticationRequest;
import com.neuroCanteen.model.authentication.AuthenticationResponse;
import com.neuroCanteen.security.util.JwtUtil;
import com.neuroCanteen.service.MyUserDetailsService;
import com.neuroCanteen.service.StaffDetailsService;
@RestController
@RequestMapping("/authenticate")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private MyUserDetailsService userDetailsService;

    @Autowired
    private StaffDetailsService staffDetailsService;

    @Autowired
    private JwtUtil jwtTokenUtil;

    @PostMapping("/admin")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) {
        try {
            // Authenticate the user
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            // Throwing a more specific exception with a custom message
            return ResponseEntity.status(401).body("Invalid username or password");
        }

        // Load user details
        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());

        // Generate JWT token
        final String jwt = jwtTokenUtil.generateToken(userDetails);

        // Return the authentication response
        return ResponseEntity.ok(new AuthenticationResponse(jwt));
    }
    @PostMapping("/staff")
    public ResponseEntity<?> createAuthenticationTokenForStaff(@RequestBody AuthenticationRequest authenticationRequest) {
        try {
            // Authenticate the user
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            // Throwing a more specific exception with a custom message
            return ResponseEntity.status(401).body("Invalid username or password");
        }

        

        // Load user details
        final UserDetails userDetails = staffDetailsService.loadUserByUsername(authenticationRequest.getUsername());

        // Generate JWT token
        final String jwt = jwtTokenUtil.generateToken(userDetails);

        // Return the authentication response
        return ResponseEntity.ok(new AuthenticationResponse(jwt));
    }
}
