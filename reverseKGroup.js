/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 *
 * https://leetcode-cn.com/problems/reverse-nodes-in-k-group/submissions/
  给你一个链表，每 k 个节点一组进行翻转，请你返回翻转后的链表。
	k 是一个正整数，它的值小于或等于链表的长度。
	如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。
	进阶：
	你可以设计一个只使用常数额外空间的算法来解决此问题吗？
	你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 * 思路：
 * 	和easy版本的反转链表有关联啊
 * 在遍历列表时，将当前节点的 next 指针改为指向前一个元素。
 * 由于节点没有引用其上一个节点，因此必须事先存储其前一个元素。
 * 在更改引用之前，还需要另一个指针来存储下一个节点。不要忘记在最后返回新的头引用！
 */
	var reverseKGroup = function (head, k) {
		let count = 0;
		let checkHead = head;
	
		/* null -> head -> 2 */
		let cur = head; /* null -> cur -> 2 */
		let nextTmp = null;
		let pre = null;
		while (checkHead !== null && count !== k) {
			checkHead = checkHead.next;
			count++;
		}
		// 判断是否足够
		if (count === k) {
			// 区间节点的置换
			/* null -> cur -> 2 */
			// 迭代方法
			while (count--) {
				nextTmp = cur.next; /* pre -> cur -> nextTmp */
				cur.next = pre; /* pre <- cur  nextTmp */
				pre = cur; /* null <- pre|cur  nextTmp */
				cur = nextTmp; /* null <- pre  cur|nextTmp */
				/** Next Loop */
				/*nextTmp = cur.next 
					null <- pre|cur -> nextTmp */
				/*cur.next = pre
					 null <- pre <- cur  nextTmp */
				/*pre = cur
					 null <- 1 <- pre|cur  nextTmp */
				/*cur = nextTmp
					 null <- 1 <- pre  cur|nextTmp */
			}
			if (nextTmp !== null) {
				/*参数，cur和nextTmp 都可以*/
				head.next = reverseKGroup(cur, k);
			}
			return pre;
		}
		return head;
	};
	