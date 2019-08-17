<?php

namespace Tests\Feature;

use App\Task;
use PHPUnit\Framework\Assert;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TaskTest extends TestCase
{
    use RefreshDatabase;

    public function testAddTask()
    {
        $response = $this->post('api/tasks', ['title' => 'New Test Task']);

        $response->assertStatus(200);
        $response->assertJson(['id' => 1, 'title' => 'New Test Task', 'completed' => 0]);
    }

    public function testCompleteTask()
    {
        $task = Task::create(['title' => 'My Test Task']);
        $task->refresh();
        Assert::assertTrue($task->completed == 0, 'Task should not be completed');

        $response = $this->patch("api/tasks/{$task->id}", ['completed' => true]);

        $response->assertStatus(200);
        $response->assertJson(['id' => 1, 'title' => 'My Test Task', 'completed' => 1]);
    }

    public function testGetTaskList()
    {
        Task::create(['title' => 'My Test Task']);
        Task::create(['title' => 'New Test Task']);

        $response = $this->get("api/tasks");

        $response->assertStatus(200);

        $response->assertJson([
            ['id' => 1, 'title' => 'My Test Task', 'completed' => 0],
            ['id' => 2, 'title' => 'New Test Task', 'completed' => 0]
        ]);
    }
}
