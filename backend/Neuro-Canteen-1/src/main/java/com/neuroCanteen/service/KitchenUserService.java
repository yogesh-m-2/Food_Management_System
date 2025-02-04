package com.neuroCanteen.service;

import com.neuroCanteen.model.kitchenUserControl.KitchenUser;
import java.util.List;

public interface KitchenUserService {
    KitchenUser createKitchenUser(KitchenUser kitchenUser);
    List<KitchenUser> getAllKitchenUsers();
    KitchenUser getKitchenUserById(int id);
    KitchenUser updateKitchenUser(int id, KitchenUser kitchenUser);
    void deleteKitchenUser(int id);
}
