//
//  ViewController.m
//  TodoList
//
//  Created by Julien Sarazin on 08/03/2017.
//  Copyright © 2017 ESGI. All rights reserved.
//

#import "ViewController.h"

static NSString * kUSER_API = @"http://127.0.0.1:3000/users";


@interface ViewController () <UITableViewDelegate, UITableViewDataSource>
@property (weak, nonatomic) IBOutlet UITextField *usernameTextField;
@property (weak, nonatomic) IBOutlet UITableView *tableView;
@property (strong, nonnull, nonatomic) NSMutableArray * users;
@property (strong, nonnull, nonatomic) UIRefreshControl *refreshControl;
@end

@implementation ViewController

- (void)viewDidLoad {
	[super viewDidLoad];
	self.users = [@[] mutableCopy];
	self.tableView.delegate = self;
	self.tableView.dataSource = self;
	self.refreshControl = [[UIRefreshControl alloc] init];
	[self.refreshControl addTarget:self action: @selector(refreshTableView) forControlEvents: UIControlEventValueChanged];
	self.tableView.refreshControl = self.refreshControl;

	[self.tableView registerClass:[UITableViewCell class] forCellReuseIdentifier:@"identifier"];
}

- (void)refreshTableView {
	NSURL *url = [NSURL URLWithString:kUSER_API];
	NSURLRequest *request = [[NSURLRequest alloc] initWithURL:url];

	[[[NSURLSession sharedSession] dataTaskWithRequest:request completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
		dispatch_async(dispatch_get_main_queue(), ^{
			[self.refreshControl endRefreshing];
		});

		if (error != nil) {
			NSLog(@"Error: %@", error.localizedDescription);
			return;
		}

		if (data == nil) {
			return;
		}

		if (response == nil) {
			return;
		}

		NSArray * usersJSON = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingAllowFragments error:nil];
		[self.users setArray:usersJSON];
		dispatch_async(dispatch_get_main_queue(), ^{
			[self.tableView reloadData];
		});
	}] resume];
}

- (IBAction)didTouchAddUser:(id)sender {
	[self.usernameTextField resignFirstResponder];
	NSURL *url = [NSURL URLWithString:kUSER_API];
	NSMutableURLRequest *request = [[NSMutableURLRequest alloc] initWithURL:url];
	[request setHTTPMethod:@"POST"];

	NSDictionary<NSString *, NSString *> *json = @{@"username": self.usernameTextField.text};

	NSData *postData = [NSJSONSerialization dataWithJSONObject:json options:0 error:nil];
	[request setHTTPBody:postData];
	[request setValue:@"application/json" forHTTPHeaderField:@"Content-Type"];

	[[[NSURLSession sharedSession] dataTaskWithRequest:request completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
		if (error != nil) {
			NSLog(@"Error: %@", error.localizedDescription);
			return;
		}

		if (data == nil) {
			return;
		}

		if (response == nil) {
			return;
		}

		dispatch_async(dispatch_get_main_queue(), ^{
			self.usernameTextField.text = @"";
		});
	}] resume];
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
	UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"identifier"];
	NSDictionary *json = self.users[indexPath.row];
	cell.textLabel.text = json[@"email"];
	return cell;
}

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
	return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
	return self.users.count;
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath {
	return 80.0f;
}

@end
