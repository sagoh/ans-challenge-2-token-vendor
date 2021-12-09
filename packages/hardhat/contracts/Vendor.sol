pragma solidity >=0.6.0 <0.7.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "./YourToken.sol";
import "hardhat/console.sol";

contract Vendor is Ownable {

  YourToken yourToken;
  uint256 public constant tokensPerEth = 100;
  event BuyTokens(address indexed buyer, uint256 amountOfETH, uint256 amountOfTokens);
  event BuyBackTokens(address indexed buyer, uint256 amountOfETH, uint256 amountOfTokens);
  constructor(address tokenAddress) public {
  yourToken = YourToken(tokenAddress);
  }

  function buyTokens() payable public {
    require(msg.value > 0, "Token value need to be greater than 0");
    
        // Expect eth to come in. divide by eth decimal and * tokens per Eth
        uint256 token = (msg.value * tokensPerEth / (10 ** 18)) ;
        require(token > 0,  "Require token greater than 0 and is an int");
        yourToken.transfer(msg.sender,token);
        emit BuyTokens(msg.sender, msg.value, token);
  }

  function buyBack() public {
    // allow the sender to buyback all the token.
    uint256 balance = yourToken.balanceOf(msg.sender);
    require(balance > 0, "You do not own any tokens");
    uint256 balanceInWei = (balance * 10 ** 18/ tokensPerEth);
    yourToken.transferFrom(msg.sender,address(this),balance);
    //send eth to sender.
    msg.sender.transfer(balanceInWei);
    emit BuyBackTokens(msg.sender, balanceInWei, balance);
  }

  function getBalanceInWei() public view returns(uint256) {
    // allow the sender to buyback all the token.
    uint256 balance = yourToken.balanceOf(msg.sender);
    require(balance > 0, "You do not own any tokens");
    uint256 balanceInWei = (balance * 10 ** 18/ tokensPerEth);
    return balanceInWei;
  }

  receive() external payable
  {
    buyTokens();
  }

  
}
