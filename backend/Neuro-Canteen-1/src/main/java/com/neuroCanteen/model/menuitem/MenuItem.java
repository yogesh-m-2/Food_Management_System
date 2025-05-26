package com.neuroCanteen.model.menuitem;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
// import jakarta.persistence.EnumType;
// import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
import java.util.Map;

import com.neuroCanteen.converter.TimeSlotConverter;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class MenuItem {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String name;
    private String category; // "Breakfast", "Beverages"
    // private double price;
    // @Enumerated(EnumType.STRING)
    // private Role role;
    @Lob
    private String picture;
    private String description;
    private boolean isAvailable; // For kitchen control
    
    // New fields for different price categories
    private double staffPrice;
    private double patientPrice;
    private double dietitianPrice;

    private String combination;

    //Addinng the New Field Formenu listing schedule
    private String diet_type;

    @Convert(converter = TimeSlotConverter.class)
    @Column(columnDefinition = "TEXT")  // or "json" for PostgreSQL
    private Map<String, List<String>> timeSlot;

}
