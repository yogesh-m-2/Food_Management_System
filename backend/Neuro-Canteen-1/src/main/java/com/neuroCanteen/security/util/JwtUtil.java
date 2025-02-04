package com.neuroCanteen.security.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.security.Keys;
import java.util.Date;
import java.security.Key;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {

    // The secret key should be kept private, don't hardcode it in production
    private static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    // Generate JWT token
    public String generateToken(UserDetails userDetails, String Role) {
    return Jwts.builder()
            .setSubject(userDetails.getUsername()) // Extract the username from UserDetails
            .claim("Role", Role)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1 hour expiration time
            .signWith(SECRET_KEY) // Use the Key object for signing
            .compact();
}

    // Extract username from JWT token
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

       // Extract role from JWT token
       public String extractRole(String token) {
        return extractClaim(token, claims -> claims.get("Role", String.class)); // Extract "Role" claim
    }

    // Extract expiration date from JWT token
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // Extract claim from JWT token
    public <T> T extractClaim(String token, ClaimsResolver<T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.resolve(claims);
    }

    // Extract all claims from JWT token
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()  // Use the new Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY) // Ensure you use SECRET_KEY here
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // Check if the token is expired
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Validate the JWT token
    public Boolean validateToken(String token, String username) {
        return (username.equals(extractUsername(token)) && !isTokenExpired(token));
    }

    // Functional interface for extracting claims
    @FunctionalInterface
    public interface ClaimsResolver<T> {
        T resolve(Claims claims);
    }
}
