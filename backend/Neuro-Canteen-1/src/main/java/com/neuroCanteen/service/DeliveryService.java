package com.neuroCanteen.service;

import java.util.List;

import com.neuroCanteen.model.delivery.Delivery;

public interface DeliveryService {
    Delivery createDelivery(Delivery delivery);
    Delivery updateDelivery(int id, Delivery delivery);
    void deleteDelivery(int id);
    List<Delivery> getAllDeliveries();
    Delivery getDeliveryById(int id);

}
