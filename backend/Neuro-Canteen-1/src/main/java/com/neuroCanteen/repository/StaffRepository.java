package com.neuroCanteen.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.neuroCanteen.model.staff.Staff;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Integer> {
}
