package ee.piperal.banking_backend.Controllers;

import ee.piperal.banking_backend.Entities.Message;
import ee.piperal.banking_backend.Services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin(origins = "*")
public class MessageController {

    @Autowired
    private MessageService messageService;


    @PostMapping("message/request")
    public void request(@RequestBody Message message) {
        messageService.sendMessage(message);
    }

    @PostMapping("message/delete")
    public void deleteMessage(@RequestBody Message message) {
        messageService.deleteMessage(message.getId());
    }

}
