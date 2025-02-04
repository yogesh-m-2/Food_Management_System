package com.neuroCanteen.service;

import com.neuroCanteen.model.deliveryUser.DeliverUser;

import java.util.List;

public interface DeliverUserService {
    DeliverUser createDeliverUser(DeliverUser deliverUser);
    DeliverUser getDeliverUserById(int id);
    List<DeliverUser> getAllDeliverUsers();
    DeliverUser updateDeliverUser(int id, DeliverUser deliverUser);
    void deleteDeliverUser(int id);
}
