package ee.piperal.banking_backend.Services;

import ee.piperal.banking_backend.Entities.Person;
import ee.piperal.banking_backend.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Person GetUser(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public List<Person> findAll() {
        return userRepository.findAll();
    }

    public void CreateUser(Person person) {
        userRepository.save(person);
    }

    public void DeleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
