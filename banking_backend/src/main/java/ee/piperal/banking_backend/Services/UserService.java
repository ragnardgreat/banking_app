package ee.piperal.banking_backend.Services;

import ee.piperal.banking_backend.Entities.Person;
import ee.piperal.banking_backend.Functions.TokenGenerator;
import ee.piperal.banking_backend.Repositories.UserRepository;
import ee.piperal.banking_backend.dto.SearchDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@CrossOrigin(origins = "*")
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public void personValidator(Person person){
        if(person.getId() == null){
            throw new RuntimeException("Person does not exist");
        }

    }

    //Mainly for user personal account
    public Person GetUser(Long id ) {
        Person person = userRepository.findById(id).orElseThrow();
        personValidator(person);
        return person;
    }
    //Used for user search
    public SearchDto checkUser(String username){
        if(userRepository.findByUsername(username).isPresent()){
            Person person = userRepository.findByUsername(username).get();
            personValidator(person);
            SearchDto searchDto = new SearchDto();
            searchDto.setUsername(person.getUsername());
            searchDto.setId(person.getId());
            return searchDto;
        }
        return new SearchDto();
    }

    public Person userLogin(String username, String password) {
        Person person = userRepository.findByUsername(username).orElseThrow();
        TokenGenerator tokenGenerator = new TokenGenerator();
        personValidator(person);
        if (person.getPassword().equals(password)) {
            person.setLogged(true);
            userRepository.save(person);
            person.setToken(tokenGenerator.token());
            userRepository.save(person);
            return person;
        }
        else{
            throw new RuntimeException("Wrong password");
        }
    }

    public void userLogout(Long id) {
        Person person = userRepository.findById(id).orElseThrow();
        person.setLogged(false);
        userRepository.save(person);
    }

    public boolean statusCheck(Long id){
        Person person = userRepository.findById(id).orElseThrow();
        return person.isLogged();
    }

    public void CreateUser(Person person) {
        if(userRepository.findUsernameByUsername(person.getUsername()).isPresent()){
            throw new RuntimeException("Username already exists");
        }
        else{
            person.setBalance("0.0");
            person.setToken("0");
            userRepository.save(person);
        }

    }

    public void DeleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
