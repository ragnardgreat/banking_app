package ee.piperal.banking_backend.Repositories;

import ee.piperal.banking_backend.Entities.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Person,Long> {

}
