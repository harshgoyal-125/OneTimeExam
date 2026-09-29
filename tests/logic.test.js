import test from 'node:test';import assert from 'node:assert/strict';import {validateQuestion,validateConfig,normalizeIdentity,deadlineFor,allowedWindow,grade,safeCsvCell,parseRoster} from '../logic.js';
test('questions strict',()=>{assert.ok(validateQuestion({text:'Q?',options:['a','b','c','d'],correct:0}).error);assert.ok(!validateQuestion({text:'Question?',options:['a','b','c','d'],correct:0}).error);assert.ok(validateQuestion({text:'Question?',options:['a','b','c'],correct:0}).error)});
test('schedule and server deadline',()=>{const e=validateConfig({title:'Quiz',durationMinutes:15,maxViolations:3}).value;assert.ok(e);assert.equal(deadlineFor(new Date('2026-09-30T04:50:00Z'),e).toISOString(),'2026-09-30T05:05:00.000Z');assert.equal(allowedWindow({...e,open:true},new Date()),true)});
test('identity and score',()=>{assert.equal(normalizeIdentity({collegeId:'College 9',name:'A B',roll:'ab123'}).value.roll,'AB123');assert.ok(normalizeIdentity({collegeId:'X',name:'A',roll:'a'}).error);assert.equal(grade([{questionId:'q1',correct:0},{questionId:'q2',correct:2}],{q1:0,q2:1}),1)});
test('CSV spreadsheet formula neutralization',()=>{assert.equal(safeCsvCell('=IMPORTXML(1)'),"\"'=IMPORTXML(1)\"");assert.equal(safeCsvCell('Hi "Bob"'),'"Hi ""Bob"""')});

test('roster validates unique IDs',()=>{assert.equal(parseRoster('C01,abc123\nC02,xyz789').value.length,2);assert.ok(parseRoster('C01,ABC123\nC02,abc123').error)});
test('CSV guards whitespace-prefixed formulas',()=>{for(let v of [' =1+1','\t@cmd','-SUM(1)'])assert.ok(safeCsvCell(v).startsWith('"\''))});
