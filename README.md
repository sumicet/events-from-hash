# events-from-hash

A function that fetches event info from a transaction hash.

Note: Only indexed params can be filtered. Read more [here](https://docs.ethers.io/v5/concepts/events/).

## Install

`npm i events-from-hash wagmi @ethersproject/abi`

## Example

`event Transfer(address indexed src, address indexed dst, uint val)`

```ts
const events = await getEventsFromHash({
    name: 'Transfer',
    args: ['0xca...'], // The source wallet address
    hash: '0x...', // The transaction hash
    addressOrName: '0x...', // The contract's address
    contractInterface: contractAbi,
})
```