import { Block } from "../interface";

export function wrapBlocks(blocks: Block[]): Block[] {
  return blocks.reduce((arr, block: Block, i: number) => {
    const isBulletedItem = block.type === "bulleted_list_item";
    if (!isBulletedItem) {
      return arr.concat(block);
    } else {
      if (i !== 0) {
        let prevBlock = arr[arr.length - 1];
        if (
          prevBlock.type === "bulleted_list_item" &&
          block.bulleted_list_item?.rich_text !== undefined
        ) {
          block.bulleted_list_item?.rich_text.map((object) => {
            if (object.plain_text) {
              prevBlock?.bulleted_list_item?.rich_text.push(object);
            }
          });
          return arr;
        } else {
          return arr.concat(block);
        }
      } else {
        return arr.concat(block);
      }
    }
  }, [] as Block[]);
}
