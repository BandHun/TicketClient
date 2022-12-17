import {Component, Input, OnInit} from '@angular/core';
import {Comment} from "../../../../models/Comment";
import {GlobalVariablesAndFunctions} from "../../../GlobalVariablesAndFunctions";
import {CommentService} from "../../../services/comment/comment.service";

@Component({
  selector: 'app-comment', templateUrl: './comment.component.html', styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  editMode = false;
  notEditedComment: Comment;

  currentUser = GlobalVariablesAndFunctions.currentUser;

  constructor(private commentService: CommentService) {
  }

  ngOnInit(): void {
    this.notEditedComment = this.comment;
    this.currentUser = GlobalVariablesAndFunctions.currentUser;
  }

  editComment() {
    this.editMode = !this.editMode;
    this.notEditedComment = this.comment;
  }

  cancelEdit() {
    this.comment.commentMessage = this.notEditedComment.commentMessage;
    this.editMode = !this.editMode;
  }

  saveComment() {
    this.commentService.updateComment(this.comment).subscribe(() => {
    });
    this.editMode = !this.editMode;
  }

}
