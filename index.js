'use strict';
// key: タスクの文字列 value: 完了しているかどうかの真偽値
let tasks = new Map();
const fs = require('fs');
const fileName = './tasks.json';

// 同期的にファイルから復元
try {
    const dataString = fs.readFileSync(fileName, 'utf8'); // テキストでは const data = fs.readFileSync(fileName, 'utf8');
    tasks = new Map(JSON.parse(dataString)); // テキストでは tasks = new Map(JSON.parse(data));
} catch (err) { // テキストでは ignore 引数
    console.log(`${fileName} から復元できませんでした。`); //テキストでは console.log(fileName + 'から復元できませんでした');
}

/**
 * タスクをファイルに保存する
 */
function saveTasks() {
    fs.writeFileSync(fileName, JSON.stringify(Array.from(tasks)), 'utf8');
}

/**
* タスク（TODO）を追加する
* @param {string} task
*/
function todo(task) {
    tasks.set(task, false);
    saveTasks();
}

/**
* タスクと完了したかどうかが含まれる配列を受け取り、完了したかを返す
* @param {array} taskAndIsDonePair
* @return {boolean} 完了したかどうか
*/
function isDone(taskAndIsDonePair) {
    return taskAndIsDonePair[1];
}

/**
* タスクと完了したかどうかが含まれる配列を受け取り、完了していないかを返す
* @param {array} taskAndIsDonePair
* @return {boolean} 完了していないかどうか
*/
function isNotDone(taskAndIsDonePair) {
    return !taskAndIsDonePair[1]; // taskAndIsDonePair[1] === false; と同じ // テキストでは !isDone(taskAndIsDonePair);
}

/**
* タスク（TODO）の一覧の配列を取得する　（未完了タスク一覧を取得する）
* @return {array}
*/
function list() {
    return Array.from(tasks)
        .filter(isNotDone)
        .map(t => t[0]);
}

/**
* タスク（TODO）を完了状態にする
* @param {string} task
*/
function done(task) {
    if (tasks.has(task)) {
        tasks.set(task, true);
        saveTasks();
    }
}

/**
* 完了済みのタスクの一覧の配列を取得する
* @return {array}
*/
function donelist() {
    return Array.from(tasks)
        .filter(isDone)
        .map(t => t[0]);
}

/**
* 項目を削除する
* @param {string} task
*/
function del(task) {
    tasks.delete(task);
    saveTasks();
}

module.exports = {
    todo,
    list,
    done,
    donelist,
    del
};