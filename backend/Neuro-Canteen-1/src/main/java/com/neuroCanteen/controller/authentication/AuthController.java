package com.neuroCanteen.controller.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import com.neuroCanteen.model.authentication.AuthenticationRequest;
import com.neuroCanteen.model.authentication.AuthenticationResponse;
import com.neuroCanteen.security.util.JwtUtil;
import com.neuroCanteen.service.*;

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
    private DietitianDetailsService dietitianDetailsService;

    @Autowired
    private DeliveryUserDetailsService deliveryUserDetailsService;

    @Autowired
    private KitchenUserDetailsService kitchenUserDetailsService;

    @Autowired
    private PatientDetailsService patientDetailsService;

    @Autowired
    private JwtUtil jwtTokenUtil;

    /**
     * Generic method to authenticate users based on role.
     */
    private ResponseEntity<?> authenticateUser(AuthenticationRequest authenticationRequest, 
                                               UserDetailsService userDetailsService, 
                                               String role) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authenticationRequest.getUsername(), 
                            authenticationRequest.getPassword()
                    )
            );
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        String jwt = jwtTokenUtil.generateToken(userDetails, role);

        return ResponseEntity.ok(new AuthenticationResponse(jwt));
    }

    @PostMapping("/admin")
    public ResponseEntity<?> authenticateAdmin(@RequestBody AuthenticationRequest authenticationRequest) {
        return authenticateUser(authenticationRequest, userDetailsService, "Admin");
    }

    @PostMapping("/staff")
    public ResponseEntity<?> authenticateStaff(@RequestBody AuthenticationRequest authenticationRequest) {
        return authenticateUser(authenticationRequest, staffDetailsService, "Staff");
    }

    @PostMapping("/dietitian")
    public ResponseEntity<?> authenticateDietitian(@RequestBody AuthenticationRequest authenticationRequest) {
        return authenticateUser(authenticationRequest, dietitianDetailsService, "Dietitian");
    }

    @PostMapping("/deliveryuser")
    public ResponseEntity<?> authenticateDeliveryUser(@RequestBody AuthenticationRequest authenticationRequest) {
        return authenticateUser(authenticationRequest, deliveryUserDetailsService, "Delivery");
    }

    @PostMapping("/kitchenuser")
    public ResponseEntity<?> authenticateKitchenUser(@RequestBody AuthenticationRequest authenticationRequest) {
        return authenticateUser(authenticationRequest, kitchenUserDetailsService, "Kitchen");
    }
    @PostMapping("/patient")
    public ResponseEntity<?> authenticatePatient(@RequestBody AuthenticationRequest authenticationRequest) {
        try {
            // Load user details based on UHID
            UserDetails userDetails = patientDetailsService.loadUserByUsername(authenticationRequest.getUhid());

            // Generate JWT token
            String jwt = jwtTokenUtil.generateToken(userDetails, "Patient");

            return ResponseEntity.ok(new AuthenticationResponse(jwt));
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid UHID");
        }
    }
}
