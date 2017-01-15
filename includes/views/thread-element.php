<?php

if (!defined('ABSPATH')) exit;

?>

<div class="thread">
    <?php $lastpost_data = $this->get_lastpost_in_topic($thread->id); ?>
    <div class="thread-status">
        <?php
        $unreadStatus = AsgarosForumUnread::getStatusTopic($thread->id);
        echo '<span class="dashicons-before dashicons-'.$thread->status.' '.$unreadStatus.'"></span>';
        ?>
    </div>
    <div class="thread-name">
        <strong><a href="<?php echo $this->getLink('topic', $thread->id); ?>" title="<?php echo esc_html(stripslashes($thread->name)); ?>"><?php echo esc_html(stripslashes($thread->name)); ?></a></strong>
        <small><?php echo __('By', 'asgaros-forum').'&nbsp;'.$this->get_username($this->get_thread_starter($thread->id)); ?></small>
    </div>
    <div class="thread-stats">
        <?php
        $count_answers = (int)($this->db->get_var($this->db->prepare("SELECT COUNT(id) FROM {$this->tables->posts} WHERE parent_id = %d;", $thread->id)) - 1);
        $count_answers_i18n = number_format_i18n($count_answers);
        $count_views_i18n = number_format_i18n($thread->views);
        ?>
        <small><?php echo sprintf(_n('%s Answer', '%s Answers', $count_answers, 'asgaros-forum'), $count_answers_i18n); ?></small>
        <small><?php echo sprintf(_n('%s View', '%s Views', (int)$thread->views, 'asgaros-forum'), $count_views_i18n); ?></small>
    </div>
    <div class="thread-poster"><?php echo $this->get_lastpost($lastpost_data, 'thread'); ?></div>
</div>
