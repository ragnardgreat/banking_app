package ee.piperal.banking_backend.Controllers;

import ee.piperal.banking_backend.Entities.Person;
import ee.piperal.banking_backend.Services.UserService;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("users/{username}")
    public Person getUser(@PathVariable Long id){
        return userService.GetUser(id);
    }

    @PostMapping("login/{username}")
    public Person login(@PathVariable String username, @RequestBody Map<String, String> body){
        String password = body.get("password");
        System.out.println(password);
        return userService.userLogin(username, password);
    }

    @PostMapping("newuser")
    public void newUser(@RequestBody Person user){
        userService.CreateUser(user);
    }

    @DeleteMapping("delete/{id}")
    public void deleteUser(@PathVariable Long id){
        userService.DeleteUser(id);
    }


}
