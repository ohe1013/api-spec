import * as path from "path";
import { generate, HttpClient } from "openapi-typescript-codegen";
import { exec } from "child_process";
import axios from "axios";
import { writeFileSync } from "fs";

// const __dirname = path.resolve();

// const specURL = "https://jsonplaceholder.typicode.com/todos";
// const outputPath = path.resolve(path.join(__dirname, "./", "__apiTypesTemp__"));

// console.log(outputPath);

// async function swaggerModelGenerate() {
//     try {
//         await generate({
//             input: specURL,
//             output: outputPath,
//             httpClient: HttpClient.AXIOS,
//             exportCore: false,
//             exportServices: false,
//             exportModels: true,
//             useOptions: true,
//             useUnionTypes: true,
//             exportSchemas: true,
//         });
//     } catch (err) {
//         console.error(err);
//     }
// }

// swaggerModelGenerate().then(() => console.log(`🚀 model 생성 완료`));

axios
    .get("https://jsonplaceholder.typicode.com/todos")
    .then((response) => {
        const data = response.data;
        const jsonContent = JSON.stringify(data);

        // JSON 파일로 저장
        writeFileSync("todoResponse.json", jsonContent, "utf8");

        // npx quicktype 명령어 실행
        exec(
            `npx quicktype -l typescript -o TodoTypes.ts todoResponse.json --just-types`,
            (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }
            }
        );
    })
    .catch((error) => {
        console.error(error);
    });
