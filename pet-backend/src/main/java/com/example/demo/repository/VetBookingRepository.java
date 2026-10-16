package com.example.demo.repository;

import com.example.demo.entity.VetBooking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VetBookingRepository
        extends JpaRepository<VetBooking, Long> {

    List<VetBooking> findByUserId(Long userId);

    List<VetBooking> findByStatus(String status);

    List<VetBooking> findByVetId(Long vetId);
}