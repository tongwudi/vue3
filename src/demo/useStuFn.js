import { onMounted, reactive } from "vue"

export default (context) => {
	const useStuData = reactive({
		stus: [
			{ id: 1, name: "zs", age: 18 },
			{ id: 2, name: "ls", age: 20 },
			{ id: 3, name: "ww", age: 24 }
		],
		stu: { id: 5, name: "lq", age: 44 },
		addStu: e => {
			e.preventDefault()
			if (Object.values(useStuData.stu).length != 3) return
			const stu = Object.assign({}, useStuData.stu)
			useStuData.stus.push(stu)
			useStuData.stu = {}
			context.emit('add', stu)
		},
		// delStu: index => {
		// 	useStuData.stus = useStuData.stus.filter((stu, idx) => index != idx)
		// }
	})

	onMounted(() => {
		console.log("子组件功能挂载");
		useStuData.stus.push({
			id: 4,
			name: "zl",
			age: 36,
		});
	});

	return useStuData
}
