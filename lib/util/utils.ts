import { Block, List } from "../interface";

export function wrapBlocks(blocks: Block[]): Block[] {
  return blocks.reduce((arr, block: Block, i: number) => {
    if (block?.bulleted_list_item !== undefined) {
      if (i === 0) {
        const list: List = {
          type: "bulleted_list_item",
          listItems: [block.bulleted_list_item],
        };
        block.list = list;
        return arr.concat(block);
      }

      const prevBlock = arr[arr.length - 1];

      if (prevBlock.type !== "bulleted_list_item") {
        const list: List = {
          type: "bulleted_list_item",
          listItems: [block.bulleted_list_item],
        };
        block.list = list;
        return arr.concat(block);
      }

      if (prevBlock?.list !== undefined) {
        prevBlock.list.listItems.push(block.bulleted_list_item);
      }

      return arr;
    } else {
      return arr.concat(block);
    }
  }, [] as Block[]);
}
