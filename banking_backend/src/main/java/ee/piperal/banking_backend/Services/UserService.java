package ee.piperal.banking_backend.Services;

import ee.piperal.banking_backend.Entities.Person;
import ee.piperal.banking_backend.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin(origins = "*")
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Person GetUser(Long id ) {
        return userRepository.findById(id).orElseThrow();
    }

    public Person userLogin(String username, String password) {
        Person person = userRepository.findByUsername(username).orElseThrow();
        if (person.getPassword().equals(password)) {
            person.setLogged(true);
            userRepository.save(person);
            return person;
        }
        return null;
    }

    public List<Person> findAll() {
        return userRepository.findAll();
    }

    public void CreateUser(Person person) {
        person.setBalance("0.0");
        userRepository.save(person);
    }

    public void DeleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
