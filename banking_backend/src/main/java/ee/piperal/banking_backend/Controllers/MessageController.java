package ee.piperal.banking_backend.Controllers;

import ee.piperal.banking_backend.Entities.Message;
import ee.piperal.banking_backend.Services.MessageService;
import ee.piperal.banking_backend.dto.MessageDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin(origins = "*")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @PostMapping("message/request")
    public void request(@RequestBody Message message) {
        messageService.sendMessage(message);
    }

    @PostMapping("/messages/{id}")
    public List<MessageDto> getMessages(@PathVariable Long id, @RequestBody String token){
        return messageService.getMessages(id, token);
    }

    @PostMapping("message/confirm")
    public void confirmMessage(@RequestBody Long id){
        messageService.confirmMessage(id);
    }

    @PostMapping("message/delete")
    public void deleteMessage(@RequestBody Message message) {
        messageService.deleteMessage(message.getId());
    }

}
