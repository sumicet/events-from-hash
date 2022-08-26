/* eslint-disable no-promise-executor-return */
import { JsonFragment, Interface } from '@ethersproject/abi';
import { getContract, GetContractArgs, fetchTransaction, fetchSigner } from 'wagmi/actions';

/**
 * @param name Event name
 * @param hash Transaction hash
 * @param args Filter args
 * @param addressOrName The address of the contract
 * @param contractInterface The contract's ABI
 */
export const getEventsFromHash = async ({
    name,
    args,
    hash,
    ...contractArgs
}: Omit<GetContractArgs, 'signerOrProvider'> & {
    name: string;
    args: any[];
    hash: `0x${string}`;
}) => {
    const signer = await fetchSigner();
    const transaction = await fetchTransaction({ hash });
    const contract = getContract({ ...contractArgs, signerOrProvider: signer });
    const iface = new Interface(contractArgs.contractInterface as JsonFragment[]);

    const filter = contract.filters[name](...args);

    const events = await contract.queryFilter(
        filter,
        transaction.blockNumber,
        transaction.blockNumber
    );

    const decodedEvents = events
        .map(event => iface.decodeEventLog(name, event.data))
        .map(decodedEvent =>
            Object.fromEntries(
                Object.entries(decodedEvent).slice(Object.entries(decodedEvent).length / 2)
            )
        );

    return decodedEvents;
};
