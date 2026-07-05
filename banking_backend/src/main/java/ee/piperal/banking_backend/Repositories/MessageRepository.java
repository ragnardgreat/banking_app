package ee.piperal.banking_backend.Repositories;


import ee.piperal.banking_backend.Entities.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*")
@Repository
public interface MessageRepository extends JpaRepository<Message,Long> {
}
