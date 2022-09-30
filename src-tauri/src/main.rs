#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn hello(x: i64, y: i64) -> i64 {
    let z = x + y;
    println!("{}", z);
    return x + y;
}

// SAVE FILE
//====================================================================
use std::fs::File;
use std::io::prelude::*;
#[tauri::command]
fn image_data(data: &str, path: &str) {
    // let to_save = format!("{0}{1}", path, "\\foo.png");
    // println!("{}", data.len());
    // println!("{}", to_save);
    let _bytes = base64::decode(data).unwrap();
    let mut file = File::create(path).expect("CAN'T CREATE");
    file.write_all(&_bytes).expect("CAN'T WRITE");
}
//====================================================================

// MAKE VIDEO
//====================================================================
use execute::Execute;
use std::process::Command;
#[tauri::command]
fn make_video(path: &str, handle: tauri::AppHandle) {
    // const FFMPEG_PATH: &str = "ffmpeg\\ffmpeg.exe";
    let resource_path = handle
        .path_resolver()
        .resolve_resource("ffmpeg\\ffmpeg.exe")
        .expect("failed to resolve resource");

    let ffmpeg = resource_path;

    print!("{}{}", path, "\\image%d.png");

    let mut command = Command::new(ffmpeg);
    command.arg("-f");
    command.arg("image2");
    command.arg("-y");
    command.arg("-i");
    command.arg(format!("{}{}", path, "\\image%d.png"));
    command.arg("-c:v");
    command.arg("libx264");
    command.arg("-pix_fmt");
    command.arg("yuv420p");
    command.arg("-r");
    command.arg("24");

    command.arg(format!("{}{}", path, "\\video.mp4"));
    let output = command.execute_output().unwrap();

    if let Some(exit_code) = output.status.code() {
        if exit_code == 0 {
            println!("Ok.");
        } else {
            eprintln!("Failed.");
        }
    } else {
        eprintln!("Interrupted!");
    }
}
//====================================================================

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            hello, greet, make_video, image_data
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
