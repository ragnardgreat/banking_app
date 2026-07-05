package ee.piperal.banking_backend.Services;

import ee.piperal.banking_backend.Entities.Message;
import ee.piperal.banking_backend.Repositories.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins = "*")
@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    public void sendMessage(@RequestBody Message message) {
        Message response = new Message();
        message.setSender(message.getSender());
        message.setReceiver(message.getReceiver());
        message.setMessage(message.getMessage());
        message.setAmount(message.getAmount());
        System.out.println(message.getMessage());
        messageRepository.save(message);
    }

    public void deleteMessage(@RequestBody Long id) {
        messageRepository.deleteById(id);
    }


}
