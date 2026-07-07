package ee.piperal.banking_backend.Repositories;

import ee.piperal.banking_backend.Entities.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionHistoryRepository extends JpaRepository<Transaction, Long> {
}
