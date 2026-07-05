package ee.piperal.banking_backend.Services;


import ee.piperal.banking_backend.Controllers.UserController;
import ee.piperal.banking_backend.Entities.Message;
import ee.piperal.banking_backend.Entities.Person;
import ee.piperal.banking_backend.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.server.ResponseStatusException;

@CrossOrigin(origins = "*")
@Service
public class BankingService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;


    public void moneyTransfer(@RequestBody Long from, Long to, double amount) {
        Person fromPerson = userRepository.findById(from).orElseThrow();
        Person toPerson = userRepository.findById(to).orElseThrow();
        userService.personValidator(fromPerson);
        userService.personValidator(toPerson);

        if (amount <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Can't transfer 0 or less than 0");
        }
        if (fromPerson.getBalance() < amount) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Not enough balance");
        }
        if (amount > fromPerson.getTransfer_limit()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Can't transfer more than " + fromPerson.getTransfer_limit());
        } else {
            fromPerson.setBalance(fromPerson.getBalance() - amount);
            toPerson.setBalance(toPerson.getBalance() + amount);
            userRepository.save(fromPerson);
            userRepository.save(toPerson);
        }
    }


    public void addFunds(@RequestBody Long id, double amount) {
        Person person = userRepository.findById(id).orElseThrow();
        userService.personValidator(person);
        if (amount <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Can't add negative amount");
        } else {
            person.setBalance(person.getBalance() + amount);
            userRepository.save(person);
        }
    }

    public void removeFunds(@RequestBody Long id, double amount) {
        Person person = userRepository.findById(id).orElseThrow();
        userService.personValidator(person);
        if (amount <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Can't remove negative amount");
        }
        if (amount > person.getBalance()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Can't remove more than balance");
        } else {
            person.setBalance(person.getBalance() - amount);
            userRepository.save(person);
        }
    }

}
