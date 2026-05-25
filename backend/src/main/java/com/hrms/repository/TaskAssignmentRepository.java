package com.hrms.repository;

import com.hrms.entity.TaskAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskAssignmentRepository extends JpaRepository<TaskAssignment, Long> {

    @Query("SELECT t FROM TaskAssignment t JOIN FETCH t.assignedTo")
    List<TaskAssignment> findAllWithEmployee();

    @Query("SELECT t FROM TaskAssignment t JOIN FETCH t.assignedTo WHERE t.assignedTo.id = :employeeId")
    List<TaskAssignment> findByAssignedToIdWithEmployee(@Param("employeeId") Long employeeId);

    @Query("SELECT t FROM TaskAssignment t JOIN FETCH t.assignedTo WHERE t.id = :id")
    Optional<TaskAssignment> findByIdWithEmployee(@Param("id") Long id);

    List<TaskAssignment> findByAssignedToId(Long employeeId);
    List<TaskAssignment> findByStatus(TaskAssignment.TaskStatus status);
    List<TaskAssignment> findByAssignedToIdAndStatus(Long employeeId, TaskAssignment.TaskStatus status);
}
