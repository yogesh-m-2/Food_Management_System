package com.neuroCanteen.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.neuroCanteen.model.delivery.Delivery;

@Repository
public interface DeliveryRepository extends JpaRepository <Delivery,Integer> {

    
}
