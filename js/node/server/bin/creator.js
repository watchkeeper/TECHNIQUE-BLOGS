/*child_process to call and create page show directory by params*/

const arr_str = process.argv.pop()
const file_str = arr_str.slice(1,arr_str.length-1)
const file_arr = file_str.split(',')
const len = file_arr.length
const dir = process.argv.pop()
// console.log(file_arr)
let dir_link_html = ''
for(let i=0;i<len;i++){
	dir_link_html += `<a href="${dir}/${file_arr[i]}">${file_arr[i]}</a>`
}
const directory_tpl = `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<title>Document Server</title>
				<style type="text/css">
					#main{
						width:100vw;height: 100vh;
						background: deepskyblue;
						display: flex;flex-direction: column;
						justify-content: flex-start;
						align-items: center;
					}	
					#list{
						width:100%;color:white;
						display: flex;justify-content: flex-start;
						flex-wrap: wrap;;
					}
					#list a{
						display: block;width:250px;
						text-align: center;margin:20px;
						text-decoration: none;
						color:white;font-weight: bold;
					}
					#list a:hover{color:black;}
				</style>
			</head>
			<body id="main">
				<h1>Document Server</h1>
				<div id="list">
					${dir_link_html}
				</div>
			</body>
			</html>`
console.log(directory_tpl)