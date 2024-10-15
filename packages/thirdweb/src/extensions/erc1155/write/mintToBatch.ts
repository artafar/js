import { maxUint256 } from "viem";
import { multicall } from "../../../extensions/common/__generated__/IMulticall/write/multicall.js";
import { upload } from "../../../storage/upload.js";
import type {
  BaseTransactionOptions,
  WithOverrides,
} from "../../../transaction/types.js";
import type { NFTInput } from "../../../utils/nft/parseNft.js";
import { encodeMintTo } from "../__generated__/IMintableERC1155/write/mintTo.js";

export type MintToBatchParams = WithOverrides<{
  to: string;
  nfts: Array<{
    supply: bigint;
    metadata: NFTInput | string;
  }>;
}>;

export function mintToBatch(
  options: BaseTransactionOptions<MintToBatchParams>,
) {
  return multicall({
    contract: options.contract,
    asyncParams: async () => {
      const uris = await Promise.all(
        options.nfts.map((item) => {
          if (typeof item.metadata === "string") {
            return item.metadata;
          }
          return upload({
            client: options.contract.client,
            files: [item.metadata],
          });
        }),
      );

      const data = uris.map((uri, index) => {
        const item = options.nfts[index];
        if (!item) {
          // Should not happen
          throw new Error("Index mismatch");
        }
        return encodeMintTo({
          to: options.to,
          // maxUint256 is used to indicate that this is a NEW token!
          tokenId: maxUint256,
          uri,
          amount: item.supply,
        });
      });

      return { data };
    },
    overrides: options.overrides,
  });
}
