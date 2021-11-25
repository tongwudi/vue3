
import { reactive, onMounted } from "vue"

function useStuFunc() {
	const data = reactive({
		stus: [
			{ id: 1, name: "zs", age: 18 },
			{ id: 2, name: "ls", age: 20 },
			{ id: 3, name: "ww", age: 24 }
		],
		stu: {},
		addStu(e) {
			e.preventDefault()
			if (Object.values(data.stu).length != 3) return
			const stu = Object.assign({}, data.stu)
			data.stus.push(stu)
			data.stu = {}
		},
		delStu(index) {
			data.stus = data.stus.filter((stu, idx) => index != idx)
		},
	})
	onMounted(() => {
		console.log('子组件挂载')
		data.stus.push({
			id: 5,
			name: "zl",
			age: 36,
		})
	})
	return { data }
}

export default useStuFunc