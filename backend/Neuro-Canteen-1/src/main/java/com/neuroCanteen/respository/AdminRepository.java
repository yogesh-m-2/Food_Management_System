package com.neuroCanteen.respository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import com.neuroCanteen.model.admin.Admin;

@Repository
public interface AdminRepository  extends JpaRepository <Admin, Integer>{
    
}
