package com.neuroCanteen.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.neuroCanteen.exceptions.ResourceNotFoundException;
import com.neuroCanteen.model.delivery.Delivery;
import com.neuroCanteen.repository.DeliveryRepository;
import com.neuroCanteen.service.DeliveryService;
@Service
public class DeliveryServiceImpl  implements DeliveryService{
     @Autowired
    private DeliveryRepository deliveryRepository;

    @Override
    public Delivery createDelivery(Delivery delivery) {
        return deliveryRepository.save(delivery);
    }

    @Override
    public Delivery updateDelivery(int id, Delivery delivery) {
        Delivery existingDelivery = deliveryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Delivery record not found: " + id));

        existingDelivery.setName(delivery.getName());
        existingDelivery.setPhoneNumber(delivery.getPhoneNumber());
        existingDelivery.setRoomNo(delivery.getRoomNo());
        existingDelivery.setBedNo(delivery.getBedNo());
        existingDelivery.setFloor(delivery.getFloor());
        existingDelivery.setWard(delivery.getWard());
        existingDelivery.setOrderReceived(delivery.isOrderReceived());
        existingDelivery.setOrderDelivered(delivery.isOrderDelivered());
        existingDelivery.setPaymentType(delivery.getPaymentType());
        existingDelivery.setCodReceiveStatus(delivery.isCodReceiveStatus());

        return deliveryRepository.save(existingDelivery);
    }

    @Override
    public void deleteDelivery(int id) {
        Delivery delivery = deliveryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Delivery record not found: " + id));
        deliveryRepository.delete(delivery);
    }

    @Override
    public List<Delivery> getAllDeliveries() {
        return deliveryRepository.findAll();
    }

    @Override
    public Delivery getDeliveryById(int id) {
        return deliveryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Delivery record not found: " + id));
    }
}


    

