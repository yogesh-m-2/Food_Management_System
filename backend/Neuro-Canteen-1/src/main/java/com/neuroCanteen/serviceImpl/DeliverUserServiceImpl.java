package com.neuroCanteen.serviceImpl;

import com.neuroCanteen.exceptions.ResourceNotFoundException;
import com.neuroCanteen.model.deliveryUser.DeliverUser;
import com.neuroCanteen.repository.DeliverUserRepository;
import com.neuroCanteen.service.DeliverUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeliverUserServiceImpl implements DeliverUserService {

    @Autowired
    private DeliverUserRepository deliverUserRepository;

    @Override
    public DeliverUser createDeliverUser(DeliverUser deliverUser) {
        return deliverUserRepository.save(deliverUser);
    }

    @Override
    public DeliverUser getDeliverUserById(int id) {
        return deliverUserRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("DeliverUser not found with ID: " + id));
    }

    @Override
    public List<DeliverUser> getAllDeliverUsers() {
        return deliverUserRepository.findAll();
    }

    @Override
    public DeliverUser updateDeliverUser(int id, DeliverUser deliverUser) {
        DeliverUser existingDeliverUser = getDeliverUserById(id);
        existingDeliverUser.setName(deliverUser.getName());
        existingDeliverUser.setUsername(deliverUser.getUsername());
        existingDeliverUser.setPassword(deliverUser.getPassword());
        existingDeliverUser.setContact(deliverUser.getContact());
        return deliverUserRepository.save(existingDeliverUser);
    }

    @Override
    public void deleteDeliverUser(int id) {
        DeliverUser deliverUser = getDeliverUserById(id);
        deliverUserRepository.delete(deliverUser);
    }
}
