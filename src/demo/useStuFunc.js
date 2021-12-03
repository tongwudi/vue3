import { onMounted, reactive } from "vue"

export default () => {
	const demo2Data = reactive({
		stus: [
			{ id: 1, name: "zs", age: 18 },
			{ id: 2, name: "ls", age: 20 },
			{ id: 3, name: "ww", age: 24 }
		],
		stu: {},
		addStu: e => {
			e.preventDefault()
			if (Object.values(demo2Data.stu).length != 3) return
			const stu = Object.assign({}, demo2Data.stu)
			demo2Data.stus.push(stu)
			demo2Data.stu = {}
		},
		delStu: index => {
			demo2Data.stus = demo2Data.stus.filter((stu, idx) => index != idx)
		}
	})

	onMounted(() => {
		console.log("子组件挂载");
		demo2Data.stus.push({
			id: 5,
			name: "zl",
			age: 36,
		});
	});

	return {
		demo2Data
	}
}
