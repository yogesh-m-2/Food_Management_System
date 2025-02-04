package com.neuroCanteen.repository;

import com.neuroCanteen.model.dietitian.Dietitian;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DietitianRepository extends JpaRepository<Dietitian, Integer> {
}
