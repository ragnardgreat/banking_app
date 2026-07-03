package ee.piperal.banking_backend.Services;

import ee.piperal.banking_backend.Entities.Person;
import ee.piperal.banking_backend.Functions.TokenGenerator;
import ee.piperal.banking_backend.Repositories.UserRepository;
import ee.piperal.banking_backend.dto.AccountDto;
import ee.piperal.banking_backend.dto.LoginDto;
import ee.piperal.banking_backend.dto.SearchDto;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
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
    public AccountDto GetUser(Long id ) {
        Person person = userRepository.findById(id).orElseThrow();
        AccountDto accountDto = new AccountDto();
        personValidator(person);
        accountDto.setId(person.getId());
        accountDto.setUsername(person.getUsername());
        accountDto.setEmail(person.getEmail());
        accountDto.setBalance(person.getBalance());
        return accountDto;
    }
    //Used for user search
    public List<SearchDto> searchUser(String username){
        List<Person> people = userRepository.userSearch(username);
        List<SearchDto> searchDtos = new ArrayList<>();
        for(Person person : people){
            searchDtos.add(new SearchDto());
            searchDtos.getLast().setUsername(person.getUsername());
            searchDtos.getLast().setId(person.getId());
        }
        System.out.println(searchDtos);
        return searchDtos;
    }

    public LoginDto userLogin(String username, String password) {
        Person person = userRepository.findByUsername(username).orElseThrow();
        TokenGenerator tokenGenerator = new TokenGenerator();
        personValidator(person);
        if (person.getPassword().equals(password)) {
            LoginDto loginDto = new LoginDto();
            person.setLogged(true);
            userRepository.save(person);
            String newToken = tokenGenerator.token();
            person.setToken(newToken);
            userRepository.save(person);
            loginDto.setId(person.getId());
            loginDto.setToken(newToken);
            return loginDto;
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
