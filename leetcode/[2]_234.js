/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
/**
 * 234. 回文链表 2021/01/07
 * https://leetcode-cn.com/problems/palindrome-linked-list/
 */
class Solution {
	public boolean isPalindrome(ListNode head) {
			ListNode fast = head;
			ListNode slow = head;

			while(fast != null && fast.next != null && fast.next.next != null) {
					fast = fast.next.next;
					slow = slow.next;
			}

			slow = reverseList(slow);
			while(head != null) {
					if (slow.val != head.val) {
							return false;
					}
					head = head.next;
					slow = slow.next;
			}
			return true;
	}
	public ListNode reverseList(ListNode head) {
			if (null == head || null == head.next) {
					return head;
			}
			ListNode newHead = reverseList(head.next);
			head.next.next = head;
			head.next = null;
			return newHead;
	}
}