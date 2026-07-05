package ee.piperal.banking_backend.Controllers;

import ee.piperal.banking_backend.Services.BankingService;
import ee.piperal.banking_backend.Services.UserService;
import ee.piperal.banking_backend.dto.AddFundsDto;
import ee.piperal.banking_backend.dto.TransferDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class BankingController {

    @Autowired
    BankingService bankingService;

    @PostMapping("transfer")
    public void transfer(@RequestBody TransferDto transferDto) {
        bankingService.moneyTransfer(transferDto.getFrom(), transferDto.getTo(), transferDto.getAmount());
    }

    @PostMapping("addfunds")
    public void addFunds(@RequestBody AddFundsDto addFundsDto) {
        bankingService.addFunds(addFundsDto.getId(), addFundsDto.getAmount());
    }

    @PostMapping("removefunds")
    public void removeFunds(@RequestBody Long id, double amount){
        bankingService.removeFunds(id, amount);
    }
}
