export const parseParagraph = (content) => {
    return content.split("\n");
}

export const parseSpace = (paragraph) =>{
    // Spaces only appears at the start of the paragraph
    let spaceCount = 0;
    for(let i = 0; i < paragraph.length; ++i){
        if(paragraph[i] === "<"){
            spaceCount += 1
        }
        else{
            break;
        }
    }
    const clippedParagraph = paragraph.substring(spaceCount);
    return {
        spaceCount,
        clippedParagraph
    }
}

// Parse array into string.
export const generateOlContent = (list) =>{
    let result = "";
    list.forEach((element, index) => {
        result += (`${index + 1}. ` + element + "\n");
    });
    return result;
}

// Parse string into array 
export const parseOlContent = (content) =>{
    let list = content.split(/\d\. /);
    list.shift();
    list.forEach((item, index) =>{
        list[index] = item.trim();
    });
    return list;
}

// Parse array into string.
export const generateUlContent = (list) =>{
    let result = "";
    list.forEach((element)=>{
        result += ("- " + element + "\n");
    });
    return result;
}

// Parse string into array 
export const parseUlContent = (content) =>{
    let list = content.split("- ");
    list.shift();
    list.forEach((item, index) =>{
        list[index] = item.trim();
    });
    return list;
}
