package com.neuroCanteen.serviceImpl;

import com.neuroCanteen.exceptions.ResourceNotFoundException;
import com.neuroCanteen.model.kitchenUserControl.KitchenUser;
import com.neuroCanteen.repository.KitchenUserRepository;
import com.neuroCanteen.service.KitchenUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KitchenUserServiceImpl implements KitchenUserService {

    @Autowired
    private KitchenUserRepository kitchenUserRepository;

    @Override
    public KitchenUser createKitchenUser(KitchenUser kitchenUser) {
        return kitchenUserRepository.save(kitchenUser);
    }

    @Override
    public List<KitchenUser> getAllKitchenUsers() {
        return kitchenUserRepository.findAll();
    }

    @Override
    public KitchenUser getKitchenUserById(int id) {
        return kitchenUserRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Kitchen user not found with ID: " + id));
    }

    @Override
    public KitchenUser updateKitchenUser(int id, KitchenUser kitchenUser) {
        KitchenUser existingUser = kitchenUserRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Kitchen user not found with ID: " + id));

        existingUser.setUserId(kitchenUser.getUserId());
        existingUser.setPassword(kitchenUser.getPassword());

        return kitchenUserRepository.save(existingUser);
    }

    @Override
    public void deleteKitchenUser(int id) {
        KitchenUser kitchenUser = kitchenUserRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Kitchen user not found with ID: " + id));
        kitchenUserRepository.delete(kitchenUser);
    }
}