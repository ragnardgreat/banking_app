package ee.piperal.banking_backend.Controllers;

import ee.piperal.banking_backend.Entities.Person;
import ee.piperal.banking_backend.Services.UserService;
import ee.piperal.banking_backend.dto.SearchDto;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;


    //Mainly meant for personal user account
    @GetMapping("users/{id}")
    public Person getUser(@PathVariable Long id){
        return userService.GetUser(id);
    }

    //Meant for user search
    @PostMapping("users/{username}")
    public SearchDto postUser(@PathVariable String username){
       return userService.checkUser(username);
    }

    //User login
    @PostMapping("login/{username}")
    public Person login(@PathVariable String username, @RequestBody Map<String, String> body){
        String password = body.get("password");
        return userService.userLogin(username, password);
    }

    //User logout
    @PostMapping("logout/{id}")
    public void logout(@PathVariable Long  id){
        userService.userLogout(id);
    }

    //Check user logged status
    @PostMapping("status/{id}")
    public boolean status(@PathVariable Long id){
        return userService.statusCheck(id);
    }
    //User creation
    @PostMapping("newuser")
    public void newUser(@RequestBody Person user){
        userService.CreateUser(user);
    }

    @DeleteMapping("delete/{id}")
    public void deleteUser(@PathVariable Long id){
        userService.DeleteUser(id);
    }


}
